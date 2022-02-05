import db from '../../../lib/db';
export default function Sell(req,res){
  db.query('select', (err, results) => {
    if (err) {
      return res.status(500).json({
        error: 'Internal Server Error'
      });
    }
    return res.status(200).json(results);
  });
}