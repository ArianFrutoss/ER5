
import express from 'express'
import * as db from './index.js'
const app = express()
const port = 3000


app.get('/test', async (req, res) =>{
  const query = `SELECT card.*,(
	
    SELECT json_agg(json_build_object('attribute_id', attribute.attribute_id, 
                                      'attribute_name', attribute.name, 
                                      'attribute_value', card_attribute.value))

FROM card_attribute
    JOIN attribute on card_attribute.attribute_id = attribute.attribute_id
    WHERE card.card_id = card_attribute.card_id
) AS attributes,

(

    SELECT json_agg(json_build_object('common_effect_id', common_effect.common_effect_id, 
                                      'common_effect_description', common_effect.description, 
                                      'common_effect_deskripzioa', common_effect.deskripzioa, 
                                      'common_effect_attribute', attribute.name, 
                                      'common_effect_value', common_effect.value))

    FROM card_common_effect
    JOIN common_effect ON card_common_effect.common_effect_id = common_effect.common_effect_id
    JOIN attribute ON common_effect.attribute_id = attribute.attribute_id
    WHERE card.card_id = card_common_effect.card_id
) AS common_effect

FROM
card;
`
  const result = await db.query(query)
  res.send(result.rows)
})

app.get('/', (req, res) => {
    res.send("hello world");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
