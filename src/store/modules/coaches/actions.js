export default {
  async newCoach(context, data) {
    const userID = context.rootGetters.userID;
    const { fullName, moneyInHour, tags, description } = data;
    const coachData = {
      fullName,
      moneyInHour,
      tags,
      description,
    };

    const token = context.rootGetters.token; // root store access

    const response = await fetch(
      `https://coaches-firebase-default-rtdb.firebaseio.com/coaches/${userID}.json?auth=${token}`,
      {
        method: "PUT",
        body: JSON.stringify(coachData),
      }
    );

    if (!response.ok) return;

    // const json = await response.json();

    context.commit("newCoach", { id: userID, ...coachData });
  },

  async loadCoaches(context, payLoad) {
    // Check on necessity of send new request on FireBase (data)
    if (!payLoad.forceRefresh && !context.getters.shouldUpdate) return;

    // Fetch Request
    const response = await fetch(
      `https://coaches-firebase-default-rtdb.firebaseio.com/coaches.json`
    );
    const json = await response?.json();

    if (!json) return;

    if (!response.ok) {
      const error = new Error(response.message || "Failed to fetch");
      throw error;
    }

    const coaches = [];

    for (const [key, obj] of Object.entries(json)) {
      coaches.push({
        id: key,
        fullName: obj.fullName,
        moneyInHour: obj.moneyInHour,
        tags: obj.tags,
        description: obj.description,
      });
    }

    context.commit("setCoaches", coaches);
    context.commit("setFetchTimeStamp");
  },
};
