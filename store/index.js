import { getIdFromURL, getTimeFromURL } from 'vue-youtube-embed'

export const state = () => ({
  Fases: null,
  Observaties: null,
  status: 0,
  activeObservationId: null,
  spreadSheetId: null,
  orderByOptions: ['Topic naam', 'Status', 'Verantwoordelijke'],
  activeOrderByOption: 0
})

export const mutations = {
  setSheet(state, { id, content }) {
    state[id] = content
  },
  setActiveObservation(state, id) {
    state.activeObservationId = id
  },
  setStatus(state, val) {
    state.status = val
  },
  setSpreadSheetId(state, val) {
    state.spreadSheetId = val
  },
  setActiveOrderBy(state, val) {
    state.activeOrderByOption = val
  }
}

export const actions = {
  async getSheet({ state, dispatch, commit }, { spreadSheetId, sheet }) {
    try {
      const resultSheet = await fetch('/.netlify/functions/get-sheet', {
        method: 'POST',
        body: JSON.stringify({
          spreadSheetId: spreadSheetId,
          sheet
        })
      })
      const content = await resultSheet.json()
      commit('setSheet', { id: sheet, content: content })
    } catch (err) {
      console.log(err)
      throw 'Unable to fetch sheet'
    }
  },

  getData({ dispatch, commit }, { spreadSheetId }) {
    // Set spreadsheetId in state
    commit('setSpreadSheetId', spreadSheetId)
    // Get & set the two sheets we need
    const observations = dispatch('getSheet', {
      spreadSheetId,
      sheet: 'Observaties'
    })
    const Fases = dispatch('getSheet', { spreadSheetId, sheet: 'Fases' })
  },

  setActiveObservation({ commit }, id) {
    console.log('here', id)
    commit('setActiveObservation', id)
  },

  setActiveOrderBy({ commit }, id) {
    commit('setActiveOrderBy', id)
  },

  async sendFormData({ state, dispatch, commit }, { data, observation }) {
    commit('setStatus', 1)
    // Overwrite the updated info from the form
    const updatedCard = {
      ...observation,
      Status: data.status || '',
      Actie: data.text || '',
      Verantwoordelijke: data.owner || ''
    }
    const toSend = {
      spreadSheetId: state.spreadSheetId,
      sheet: 'Observaties',
      card: updatedCard
    }

    console.log(toSend)
    const updatedRow = await fetch('/.netlify/functions/update-sheet', {
      method: 'POST',
      body: JSON.stringify(toSend)
    })

    console.log(updatedRow)
    return
    // try {
    //   const updatedRow = fetch('/.netlify/functions/update-sheet', {
    //     method: 'POST',
    //     body: JSON.stringify(toSend)
    //   }).then(res => {
    //     console.log('RES', res)
    //     commit('setStatus', 2)
    //     dispatch('getSheet', {
    //       spreadSheetId: toSend.spreadSheetId,
    //       sheet: toSend.sheet
    //     }).then(res => {
    //       commit('setStatus', 2)
    //       setTimeout(function() {
    //         commit('setStatus', 0)
    //       }, 500)
    //     })
    //   })
    //
    //   const content = await updatedRow.json()
    //
    //   console.log(content)
    // } catch (err) {
    //   console.log(err)
    //   throw 'Unable to fetch sheet'
    // }

    // console.log(toSend)
  }
}

export const getters = {
  ObservationsOrderedBy: state => {
    const orderBy = state.orderByOptions[state.activeOrderByOption]
    if (state.Observaties == undefined) return null
    if (state.Observaties == null) return null
    const ObservationsOrdered = state.Observaties.reduce((acc, observation) => {
      let title = observation[orderBy]
      if (!title) title = 'Niet bepaald'
      if (acc[title]) {
        acc[title].cards = [...acc[title].cards, observation.Id * 1]
      } else {
        acc[title] = {
          cards: [observation.Id * 1]
        }
      }
      return acc
    }, {})
    return ObservationsOrdered
  },

  activeObservation: state => {
    if (state.Observaties === null) return null
    if (state.activeObservationId === null) return null
    return state.Observaties[state.activeObservationId]
  },

  parsedObservation: (state, getters) => {
    if (typeof getters.activeObservation == 'undefined') return null
    const entry = getters.activeObservation
    if (typeof entry == 'undefined') return null
    const videoId = getIdFromURL(entry['Moment Video'])
    const videoStartTime = getTimeFromURL(entry['Moment Video'])

    const action = {
      id: entry.Id,
      report: {
        text: entry['Moment Beschrijving']
      },
      phase: {
        order: entry['Fase Nummer'],
        name: entry['Fase Naam'],
        descr: entry['Fase Beschrijving']
      },
      observation: {
        text: entry['Opmerking'],
        context: entry['Moment Id']
      },
      action: {
        text: entry['Actie'],
        context: entry['Moment Beschrijving']
      },
      persona: {
        name: entry['Persona Naam'],
        descr: entry['Persona Beschrijving']
      },
      session: {
        videoId: videoId,
        videoStartTime: videoStartTime,
        date: entry['Sessie Datum']
      },
      user: {
        name: entry['Gebruiker Naam'],
        age: entry['Gebruiker Leeftijd']
        // 'email': entry.gsx$.$t,
      },
      stakeholder: {
        name: entry['Stakeholder Naam'],
        email: entry['Stakeholder Email'],
        division: entry['Stakeholder Afdeling']
        // 'email': entry.gsx$.$t,
      },
      owner: {
        name: entry['Verantwoordelijke'],
        status: entry['Timing'],
        timing: entry['Status']
        // 'email': entry.gsx$.$t,
      }
    }

    return action
  }
}
