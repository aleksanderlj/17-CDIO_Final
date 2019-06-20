package DAL.DAO.ArrayDAO;

import DAL.DAO.IDAO;
import DAL.DTO.ProduktBatch;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ProduktBatchDAO_Array implements IDAO<ProduktBatch> {
    List<ProduktBatch> produktBatchList = new ArrayList<>();

    public ProduktBatchDAO_Array(){
        produktBatchList.add(new ProduktBatch(1, 1, 0, "10/06/2019", ""));
        produktBatchList.add(new ProduktBatch(2, 2, 2, "18/06/2019", "20/06/2019"));
        produktBatchList.add(new ProduktBatch(3, 2, 1, "20/06/2019", ""));
        produktBatchList.add(new ProduktBatch(4, 3, 1, "24/05/2019", ""));
    }

    @Override
    public int create(ProduktBatch produktBatch) throws IDAO.DALException, SQLException {
        int  new_id = 1;

        for(int n=0 ; n<produktBatchList.size() ; n++){
            if (produktBatchList.get(n).getId() >= new_id){
                new_id = produktBatchList.get(n).getId()+1;
            }
        }

        produktBatch.setId(new_id);
        produktBatchList.add(produktBatch);

        return new_id;
    }

    @Override
    public ProduktBatch get(int id) throws IDAO.DALException, SQLException {
        ProduktBatch produktBatch = null;
        for(int n=0 ; n<produktBatchList.size() ; n++){
            if (produktBatchList.get(n).getId() == id){
                produktBatch = produktBatchList.get(n);
            }
        }
        return produktBatch;
    }

    @Override
    public ProduktBatch[] getList() throws IDAO.DALException, SQLException {
        return produktBatchList.toArray(new ProduktBatch[produktBatchList.size()]);
    }

    @Override
    public void update(ProduktBatch produktBatch) throws IDAO.DALException, SQLException {
        for (int n=0 ; n<produktBatchList.size() ; n++){
            if (produktBatchList.get(n).getId() == produktBatch.getId()){
                produktBatchList.set(n, produktBatch);
            }
        }
    }

    @Override
    public void delete(int id) throws IDAO.DALException, SQLException {
        for (int n=0 ; n<produktBatchList.size() ; n++){
            if (produktBatchList.get(n).getId() == id){
                produktBatchList.remove(n);
                n--;
            }
        }
    }
}
