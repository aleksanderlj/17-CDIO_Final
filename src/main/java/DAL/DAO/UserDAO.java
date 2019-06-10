package DAL.DAO;

import DAL.ConnectionController;
import DAL.DTO.User;

import java.sql.*;
import java.util.List;

public class UserDAO implements IDAO<User> {

    ConnectionController connectionController = new ConnectionController();

    @Override
    public int create(User user) throws DALException, SQLException {
        Connection connection = connectionController.createConnection();

        try{
            connection.setAutoCommit(false);

            PreparedStatement statement = connection.prepareStatement
                    ("INSERT INTO bruger (brugerID, brugerNavn, ini, cpr, aktiv) VALUES (?,?,?,?,?);");
            statement.setInt(1, user.getId());
            statement.setString(2,user.getNavn());
            statement.setString(3,user.getIni());
            statement.setString(4,user.getCpr());
            statement.setBoolean(5,user.isAktiv());
            statement.executeUpdate();

            connection.commit();
        }catch (SQLException e){
            connection.rollback();
            e.printStackTrace();
        }
        connection.close();
        return 0;
    }

    @Override
    public User get(int id) throws DALException, SQLException {
        Connection connection = connectionController.createConnection();
        User user = new User();
        user.setId(id);

        try{
            connection.setAutoCommit(false);

            PreparedStatement statement = connection.prepareStatement
                    ("SELECT * FROM bruger WHERE brugerID = ?;");
            statement.setInt(1, id);
            ResultSet resultSet = statement.executeQuery();

            if (resultSet.next()){
                user.setNavn(resultSet.getString(2));
                user.setIni(resultSet.getString(3));
                user.setCpr(resultSet.getString(4));
                user.setAktiv(resultSet.getBoolean(5));
            }

            connection.commit();
        }catch (SQLException e){
            connection.rollback();
            e.printStackTrace();
        }
        connection.close();
        return user;
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
