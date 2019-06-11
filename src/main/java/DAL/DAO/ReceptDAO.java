package DAL.DAO;

import DAL.ConnectionController;
import DAL.DTO.Recept;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ReceptDAO implements IDAO<Recept> {

    ConnectionController connectionController = new ConnectionController();

    @Override
    public int create(Recept recept) throws DALException, SQLException {
        Connection connection = connectionController.createConnection();

        try{
            connection.setAutoCommit(false);

            PreparedStatement statement = connection.prepareStatement
                    ("INSERT INTO recpet (receptID, receptNavn) VALUES (?,?);");
            statement.setInt(1, recept.getId());
            statement.setString(2,recept.getNavn());
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
    public Recept get(int id) throws DALException, SQLException {
        Connection connection = connectionController.createConnection();
        Recept recept = new Recept();
        recept.setId(id);

        try{
            connection.setAutoCommit(false);

            PreparedStatement statement = connection.prepareStatement
                    ("SELECT * FROM recept WHERE receptID = ?;");
            statement.setInt(1, id);
            ResultSet resultSet = statement.executeQuery();
            if (resultSet.next()){
                recept.setNavn(resultSet.getString(2));
            }

            connection.commit();
        }catch (SQLException e){
            connection.rollback();
            e.printStackTrace();
        }
        connection.close();
        return recept;
    }

    @Override
    public Recept[] getList() throws DALException, SQLException {
        List<Recept> receptList = new ArrayList<>();
        Connection connection = connectionController.createConnection();
        Recept[] receptArray;
        int lastElement;

        try{
            connection.setAutoCommit(false);

            PreparedStatement statement = connection.prepareStatement
                    ("SELECT * FROM recept;");
            ResultSet resultSet = statement.executeQuery();
            while(resultSet.next()){
                receptList.add(new Recept());
                lastElement = receptList.size() - 1;
                receptList.get(lastElement).setId(resultSet.getInt(1));
                receptList.get(lastElement).setNavn(resultSet.getString(2));
            }
            connection.commit();
        }catch (SQLException e){
            connection.rollback();
            e.printStackTrace();
        }
        connection.close();
        receptArray = receptList.toArray(new Recept[receptList.size()]);

        return receptArray;
    }

    @Override
    public void update(Recept recept) throws DALException, SQLException {
        Connection connection = connectionController.createConnection();

        try{
            connection.setAutoCommit(false);

            PreparedStatement statement = connection.prepareStatement
                    ("UPDATE recept SET receptNavn = ? WHERE receptID = ?;");
            statement.executeUpdate();
            statement.setString(1, recept.getNavn());
            statement.setInt(2,recept.getId());

            connection.commit();
        }catch (SQLException e){
            e.printStackTrace();
            connection.rollback();
        }
        connection.close();
    }

    @Override
    public void delete(int id) throws DALException, SQLException {
        Connection connection = connectionController.createConnection();

        try{
            connection.setAutoCommit(false);

            PreparedStatement statement = connection.prepareStatement
                    ("DELETE FROM recept WHERE receptID = ?;");
            statement.setInt(1,id);
            statement.executeUpdate();

            connection.commit();
        }catch(SQLException e){
            e.printStackTrace();
            connection.rollback();
        }
        connection.close();
    }
}
