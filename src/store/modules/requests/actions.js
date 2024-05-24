export default {
  async contactCoach(context, payLoad) {
    const newRequest = {
      email: payLoad.email,
      message: payLoad.message,
    };

    const response = await fetch(
      `https://coaches-firebase-default-rtdb.firebaseio.com/requests/${payLoad.coachID}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      const error = new Error(response.message || 'Failed to send request.');
      throw error;
    }

    newRequest.id = json.name;
    newRequest.coachID = payLoad.coachID;

    context.commit('addRequest', newRequest);
  },

  async loadRequests(context) {
    const coachID = context.rootGetters.userID;
    const token = context.rootGetters.token;

    const response = await fetch(
      `https://coaches-firebase-default-rtdb.firebaseio.com/requests/${coachID}.json?auth=${token}`
    );

    const json = await response.json();

    if (!json) return;

    if (!response.ok) {
      const error = new Error(response.message || 'Failed to fetch requests.');
      throw error;
    }

    const requests = [];

    for (const [key, obj] of Object.entries(json)) {
      requests.push({
        id: key,
        coachID,
        email: obj.email,
        message: obj.message,
      });
    }

    context.commit('setRequests', requests);
  },
};
