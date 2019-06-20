package DAL.DAO.ArrayDAO;

import DAL.DAO.IDAO;
import DAL.DTO.Raavare;
import DAL.DTO.User;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class RaavareDAO_Array implements IDAO<Raavare> {

    List<Raavare> raavareList = new ArrayList<>();

    public RaavareDAO_Array(){
        raavareList.add(new Raavare(1, "Vand"));
        raavareList.add(new Raavare(2, "Salt"));
        raavareList.add(new Raavare(3, "Honning"));
    }

    @Override
    public int create(Raavare raavare) throws DALException, SQLException {
        boolean taken = false;

        for(int n=0 ; n<raavareList.size() ; n++){
            if (raavareList.get(n).getId() == raavare.getId()){
                taken = true;
            }
        }

        if (!taken){
            raavareList.add(raavare);
        }else {
            throw new DALException("Error");
        }
        return 0;
    }

    @Override
    public Raavare get(int id) throws DALException, SQLException {
        return null;
    }

    @Override
    public Raavare[] getList() throws DALException, SQLException {
        return new Raavare[0];
    }

    @Override
    public void update(Raavare raavare) throws DALException, SQLException {

    }

    @Override
    public void delete(int id) throws DALException, SQLException {

    }
}
