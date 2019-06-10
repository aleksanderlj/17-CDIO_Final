package DAL.DAO;

import DAL.ConnectionController;
import DAL.DTO.User;

import java.sql.*;
import java.util.List;

public class UserDAO implements IDAO<User> {

    ConnectionController connectionController = new ConnectionController();

    @Override
    public int create(User objekt) throws DALException, SQLException {
        Connection connection = connectionController.createConnection();



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
