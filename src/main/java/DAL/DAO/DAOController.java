package DAL.DAO;

import DAL.DAO.ArrayDAO.*;
import DAL.DTO.*;

public class DAOController {
    private static IDAO[] dao_list = new IDAO[]{new ProduktBatchDAO(), new RaavareBatchDAO(), new RaavareDAO(), new ReceptDAO(), new UserDAO()};
    private static IKompDAO<ProduktBatchKomp> pBatchKomp = new ProduktBatchKompDAO();

    //private static IDAO[] dao_list = new IDAO[]{new ProduktBatchDAO_Array(), new RaavareBatchDAO_Array(), new RaavareDAO_Array(), new ReceptDAO_Array(), new UserDAO_Array()};
    //private static IKompDAO<ProduktBatchKomp> pBatchKomp = new ProduktBatchKompDAO_Array();

    public static IDAO<ProduktBatch> getProduktBatchDAO(){
        return dao_list[0];
    }

    public static IKompDAO<ProduktBatchKomp> getProduktBatchKompDAO(){
        return pBatchKomp;
    }

    public static IDAO<RaavareBatch> getRaavareBatchDAO(){
        return dao_list[1];
    }

    public static IDAO<Raavare> getRaavareDAO(){
        return dao_list[2];
    }

    public static IDAO<Recept> getReceptDAO(){
        return dao_list[3];
    }

    public static IDAO<User> getUserDAO(){
        return dao_list[4];
    }
}
