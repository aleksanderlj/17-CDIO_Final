package DAL.DAO;

import DAL.DTO.Recept;

import java.sql.SQLException;
import java.util.List;

public class ReceptDAO implements IDAO<Recept> {

    @Override
    public int create(Recept objekt) throws DALException, SQLException {
        //TODO - Lav metode
        return 0;
    }

    @Override
    public Recept get(int id) throws DALException, SQLException {
        //TODO - Lav metode
        return null;
    }

    @Override
    public Recept[] getList() throws DALException, SQLException {
        //TODO - Lav metode
        return null;
    }

    @Override
    public void update(Recept objekt) throws DALException, SQLException {
        //TODO - Lav metode
    }

    @Override
    public void delete(int id) throws DALException, SQLException {
        //TODO - Lav metode
    }
}
