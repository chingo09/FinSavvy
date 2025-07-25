// Transaction Controllers

const fs = require('fs');
const path = require('path');

const getTransactions = (req, res) => {
  const filePath = path.join(__dirname, '../mock/plaid_transaction.json');

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error('Error reading files:', err);
      return res.status(500).json({error: 'Could not load mock transactions'});
    }

    try {
      const parsedData = JSON.parse(data);
      const rawTransactions = parsedData.transactions;

      const cleanedTransactions = rawTransactions.map(txn => ({
        id: txn.transaction_id, 
        date: txn.date,
        name: txn.name || txn.merchant_name,
        amount: txn.amount,
        category: txn.personal_finance_category?.primary || "Uncategorized",
      }));

      res.json({ transactions: cleanedTransactions });
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).json({error: 'Invalid JSON structure'});
    }
  });
};

module.exports = { getTransactions };