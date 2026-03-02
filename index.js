const axios = require('axios');

const PI_AMOUNT = 1111;

const perform = async () => {
  try {
    const res = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=pi-network&vs_currencies=usd');

    const value = res.data["pi-network"].usd;

    console.log("PI VALUE =", value);

    const totalWorth = value * PI_AMOUNT;
    const netWorth = totalWorth * 0.7;
    const taxDues = totalWorth * 0.3;

    console.log("Total worth =", totalWorth);
    console.log("Net worth =", netWorth);
    console.log("Tax dues =", taxDues);
    console.log("\n================\n");

  } catch (e) {
    console.log("Erreur API", e.response?.data || e.message);
  }

//   setTimeout(perform, 30000);
};

perform();
