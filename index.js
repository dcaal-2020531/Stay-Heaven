<<<<<<< HEAD

      import { initServer } from "./configs/app.js";
      import { config } from "dotenv"; 
    
      import { connect } from "./configs/mongo.js";
      
      config()
      initServer()
      connect()
=======
//Ejecutar el proyecto
    //DESESTRUCTURAR
    import { initServer} from "./configs/app.js";
    import { config } from "dotenv"; //DECIRLE A NODE JS QUE SE USA DOTENV
    import { connect } from "./configs/mongo.js";
    
    config()
    initServer()
    connect()
>>>>>>> 86e7ab6ce144cc14158c2684e5aeaabd5ab4270f
