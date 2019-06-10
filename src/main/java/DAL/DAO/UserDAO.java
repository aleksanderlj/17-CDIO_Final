package DAL.DAO;

import DAL.DTO.User;

import java.sql.SQLException;
import java.util.List;

public class UserDAO implements IDAO<User> {

    @Override
    public int create(User objekt) throws DALException, SQLException {
        //TODO - Lav metode
        return 0;
    }

    @Override
    public User get(int id) throws DALException, SQLException {
        //TODO - Lav metode
        return null;
    }

    @Override
    public List<User> getList() throws DALException, SQLException {
        //TODO - Lav metode
        return null;
    }

    @Override
    public int update(User objekt) throws DALException, SQLException {
        //TODO - Lav metode
        return 0;
    }

    @Override
    public void delete(int id) throws DALException, SQLException {
        //TODO - Lav metode
    }
}
