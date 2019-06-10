package DAL.DAO;

import DAL.DTO.ProduktBatchKomp;
import java.sql.SQLException;

public class ProduktBatchKompDAO implements IKompDAO<ProduktBatchKomp> {

    //todo
    @Override
    public int create(ProduktBatchKomp raavare) throws SQLException {
        return 0;
    }

    //todo
    @Override
    public ProduktBatchKomp get(int receptId, int raavareId) throws SQLException {
        return null;
    }

    //todo
    @Override
    public ProduktBatchKomp[] getList() {
        return null;
    }

    //todo
    @Override
    public ProduktBatchKomp[] getList(int id) {
        return null;
    }

    //todo
    @Override
    public void update(ProduktBatchKomp raavare){

    }

    //todo
    @Override
    public void delete(int id){

    }
}
