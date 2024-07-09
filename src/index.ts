import { Knex } from "./server/database/knex";
import { app } from "./server/server";


function startApp (){
    app.listen(3000, () =>{
        console.log("Start serever in port 3000 ...")
    })
}


if (process.env.IS_LOCALHOST !== "true"){
    Knex.seed.run().then( () => {
        Knex.migrate.latest()
        .then( () => startApp())
        .catch( error => console.log(error))
    })
    .catch( error => console.log(error))

}else{
    startApp()
}