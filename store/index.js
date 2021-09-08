export const state = () => ({
  Fases: null,
  Observaties: null,
  status: 0,
  activeObservationId: null
})

export const mutations = {
  setSheet(state, { id, content }) {
    state[id] = content
  },
  setActiveObservation(state, id) {
    state.activeObservationId = id
  },
  // OLD
  setStatus(state, val) {
    state.status = val
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

  getData({ dispatch }, { spreadSheetId }) {
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
  //OLD

  async sendFormData(
    { state, dispatch, commit },
    { spreadSheetId, actionData, activeCard }
  ) {
    commit('setStatus', 1)
    console.log('here goes', spreadSheetId, activeCard, actionData)

    // Overwrite the updated info from the form
    const updatedCard = {
      ...activeCard,
      Status: actionData.status,
      Actie: actionData.text,
      Verantwoordelijke: actionData.owner
    }

    const data = {
      spreadSheetId: spreadSheetId,
      sheet: 'Observaties',
      card: updatedCard
    }

    try {
      const updatedRow = fetch('/.netlify/functions/update-sheet', {
        method: 'POST',
        body: JSON.stringify(data)
      }).then(res => {
        console.log('RES', res)
        // commit('setStatus', 2)
        dispatch('getSheet', { spreadSheetId, sheet: data.sheet }).then(res => {
          commit('setStatus', 2)
          setTimeout(function() {
            commit('setStatus', 0)
          }, 500)
        })
      })

      const content = await updatedRow.json()

      console.log(content)
    } catch (err) {
      console.log(err)
      throw 'Unable to fetch sheet'
    }
  }
}

export const getters = {
  ObservationsPerTopic: state => {
    if (state.Observaties == undefined) return null
    if (state.Observaties == null) return null
    const ObservationsPerTopic = state.Observaties.reduce(
      (acc, observation) => {
        if (observation['Moment Beschrijving'] == undefined) return acc
        const topic = observation['Topic naam']
        if (acc[topic]) {
          acc[topic].cards = [...acc[topic].cards, observation.Id * 1]
        } else {
          acc[topic] = {
            description: observation['Topic beschrijving'],
            cards: [observation.Id * 1]
          }
        }
        return acc
      },
      {}
    )
    return ObservationsPerTopic
  },

  activeObservation: state => {
    if (state.Observaties === null) return null
    if (state.activeObservationId === null) return null
    return state.Observaties[state.activeObservationId]
  }
}
