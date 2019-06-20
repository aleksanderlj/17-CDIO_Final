package DAL.DAO.ArrayDAO;

import DAL.DAO.IDAO;
import DAL.DAO.IKompDAO;
import DAL.DTO.ProduktBatchKomp;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ProduktBatchKompDAO_Array implements IKompDAO<ProduktBatchKomp> {

    List<ProduktBatchKomp> produktBatchKompList = new ArrayList<>();

    public ProduktBatchKompDAO_Array(){
        produktBatchKompList.add(new ProduktBatchKomp(2, 2, 5.01, 1.98, 1));
        produktBatchKompList.add(new ProduktBatchKomp(2, 4, 4.96, 0.503, 1));
        produktBatchKompList.add(new ProduktBatchKomp(3, 3, 5.11, 0.499, 2));
        produktBatchKompList.add(new ProduktBatchKomp(4, 4, 5.08, 0.435, 3));
    }

    @Override
    public int create(ProduktBatchKomp produktBatchKomp) throws DALException, SQLException {
        produktBatchKompList.add(produktBatchKomp);
        return 0;
    }

    @Override
    public ProduktBatchKomp get(int primaryId, int secondaryId) throws DALException, SQLException {
        ProduktBatchKomp produktBatchKomp = null;
        for(int n=0 ; n<produktBatchKompList.size() ; n++){
            if (produktBatchKompList.get(n).getProduktBatchID() == primaryId && produktBatchKompList.get(n).getRaavareBatchID() == secondaryId){
                produktBatchKomp = produktBatchKompList.get(n);
            }
        }
        return produktBatchKomp;
    }

    @Override
    public ProduktBatchKomp[] getList(int id) throws DALException, SQLException {
        List<ProduktBatchKomp> kompList = new ArrayList<>();
        for(int n=0 ; n<produktBatchKompList.size() ; n++){
            if (produktBatchKompList.get(n).getProduktBatchID() == id){
                kompList.add(produktBatchKompList.get(n));
            }
        }
        return kompList.toArray(new ProduktBatchKomp[kompList.size()]);
    }


    @Override
    public ProduktBatchKomp[] getList() throws DALException, SQLException {
        return produktBatchKompList.toArray(new ProduktBatchKomp[produktBatchKompList.size()]);
    }

    @Override
    public void update(ProduktBatchKomp produktBatchKomp) throws DALException, SQLException {
        for(int n=0 ; n<produktBatchKompList.size() ; n++){
            if (produktBatchKompList.get(n).getProduktBatchID() == produktBatchKomp.getProduktBatchID() && produktBatchKompList.get(n).getRaavareBatchID() == produktBatchKomp.getRaavareBatchID()){
                produktBatchKompList.set(n, produktBatchKomp);
            }
        }
    }

    @Override
    public void delete(int primaryId, int secondaryId) throws DALException, SQLException {
        for(int n=0 ; n<produktBatchKompList.size() ; n++){
            if (produktBatchKompList.get(n).getProduktBatchID() == primaryId && produktBatchKompList.get(n).getRaavareBatchID() == secondaryId){
                produktBatchKompList.remove(produktBatchKompList.get(n));
            }
        }
    }
}
