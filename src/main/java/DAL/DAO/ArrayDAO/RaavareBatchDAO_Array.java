package DAL.DAO.ArrayDAO;

import DAL.DAO.IDAO;
import DAL.DTO.RaavareBatch;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class RaavareBatchDAO_Array implements IDAO<RaavareBatch>{
    List<RaavareBatch> raavareBatchList = new ArrayList<>();

    public RaavareBatchDAO_Array(){
        raavareBatchList.add(new RaavareBatch(1, 1, 1.59, "Hofer"));
        raavareBatchList.add(new RaavareBatch(2, 2, 7.42, "Ajax"));
        raavareBatchList.add(new RaavareBatch(3, 2, 2.05, "Netto"));
        raavareBatchList.add(new RaavareBatch(4, 3, 0.25, "Kvickly"));
    }

    @Override
    public int create(RaavareBatch raavareBatch) throws DALException, SQLException {
        boolean taken = false;

        for(int n=0 ; n<raavareBatchList.size() ; n++){
            if (raavareBatchList.get(n).getId() == raavareBatch.getId()){
                taken = true;
            }
        }

        if (!taken){
            raavareBatchList.add(raavareBatch);
        }else {
            throw new DALException("Error");
        }
        return 0;
    }

    @Override
    public RaavareBatch get(int id) throws DALException, SQLException {
        RaavareBatch raavareBatch = null;
        for(int n=0 ; n<raavareBatchList.size() ; n++){
            if (raavareBatchList.get(n).getId() == id){
                raavareBatch = raavareBatchList.get(n);
            }
        }
        return raavareBatch;
    }

    @Override
    public RaavareBatch[] getList() throws DALException, SQLException {
        return raavareBatchList.toArray(new RaavareBatch[raavareBatchList.size()]);
    }

    @Override
    public void update(RaavareBatch raavareBatch) throws DALException, SQLException {
        for (int n=0 ; n<raavareBatchList.size() ; n++){
            if (raavareBatchList.get(n).getId() == raavareBatch.getId()){
                raavareBatchList.set(n, raavareBatch);
            }
        }
    }

    @Override
    public void delete(int id) throws DALException, SQLException {
        for (int n=0 ; n<raavareBatchList.size() ; n++){
            if (raavareBatchList.get(n).getId() == id){
                raavareBatchList.remove(n);
                n--;
            }
        }
    }
}
