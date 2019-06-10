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
    public User[] getList() throws DALException, SQLException {
        //TODO - Lav metode
        return null;
    }

    @Override
    public void update(User objekt) throws DALException, SQLException {
        //TODO - Lav metode
    }

    @Override
    public void delete(int id) throws DALException, SQLException {
        //TODO - Lav metode
    }
}
