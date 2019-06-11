package DAL.DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import DAL.ConnectionController;
import DAL.DTO.ProduktBatch;

public class ProduktBatchDAO implements IDAO<ProduktBatch> {

    ConnectionController connectionController = new ConnectionController();

    //todo
    @Override
    public int create(ProduktBatch produktBatch) throws SQLException {
        Connection connection = connectionController.createConnection();

        try{
            connection.setAutoCommit(false);

            PreparedStatement statement = connection.prepareStatement
                    ("INSERT INTO produktBatch (produktBatchID, receptID, batchStatus, opstartDato, slutDato) VALUES (?,?,?,?,?);");

            statement.setInt(1, produktBatch.getId());
            statement.setInt(2, produktBatch.getReceptId());
            statement.setInt(3, produktBatch.getBatchStatus());
            statement.setString(4, produktBatch.getOpstartDato());
            statement.setString(5, produktBatch.getSlutDato());

            statement.executeUpdate();

            connection.commit();
        }catch (SQLException e){
            connection.rollback();
            e.printStackTrace();
        }
        connection.close();
        return 0;
    }

    //todo
    @Override
    public ProduktBatch get(int id) throws SQLException {
        Connection connection = connectionController.createConnection();

        ProduktBatch produktBatch = new ProduktBatch();
        produktBatch.setId(id);

        try{
            connection.setAutoCommit(false);

            PreparedStatement statement = connection.prepareStatement
                    ("SELECT * FROM produktBatch WHERE produktBatchID = ?;");
            statement.setInt(1, id);
            ResultSet resultSet = statement.executeQuery();

            if (resultSet.next()){
                produktBatch.setReceptId(resultSet.getInt(2));
                produktBatch.setBatchStatus(resultSet.getInt(3));
                produktBatch.setOpstartDato(resultSet.getString(4));
                produktBatch.setSlutDato(resultSet.getString(5));
            }

            connection.commit();
        }catch (SQLException e){
            connection.rollback();
            e.printStackTrace();
        }
        connection.close();
        return null;
    }

    //todo
    @Override
    public ProduktBatch[] getList() throws SQLException{

        List<ProduktBatch> produktBatchList = new ArrayList<>();
        Connection connection = connectionController.createConnection();
        ProduktBatch[] produktBatchArray;
        int lastElement;

        try{
            connection.setAutoCommit(false);

            PreparedStatement statement = connection.prepareStatement
                    ("SELECT * FROM produktBatch;");
            ResultSet resultSet = statement.executeQuery();
            while(resultSet.next()){
                produktBatchList.add(new ProduktBatch());
                lastElement = produktBatchList.size() - 1;
                produktBatchList.get(lastElement).setId(resultSet.getInt(1));
                produktBatchList.get(lastElement).setReceptId(resultSet.getInt(2));
                produktBatchList.get(lastElement).setBatchStatus(resultSet.getInt(3));
                produktBatchList.get(lastElement).setOpstartDato(resultSet.getString(4));
                produktBatchList.get(lastElement).setSlutDato(resultSet.getString(5));
            }

            connection.commit();
        }catch (SQLException e){
            connection.rollback();
            e.printStackTrace();
        }
        connection.close();
        produktBatchArray = produktBatchList.toArray(new ProduktBatch[produktBatchList.size()]);

        return produktBatchArray;
    }

    //todo
    @Override
    public void update(ProduktBatch produktBatch)throws SQLException{

        Connection connection = connectionController.createConnection();

        try{
            connection.setAutoCommit(false);

            PreparedStatement statement = connection.prepareStatement
                    ("UPDATE produktBatch SET batchStatus = ?, slutDato = ? WHERE produktID = ?;");
            statement.executeUpdate();
            statement.setInt(1, produktBatch.getBatchStatus());
            statement.setString(2, produktBatch.getSlutDato());


            connection.commit();
        }catch (SQLException e){
            connection.rollback();
            e.printStackTrace();
        }
        connection.close();
    }

    //todo
    @Override
    public void delete(int id)throws SQLException{

        Connection connection = connectionController.createConnection();

        try{
            connection.setAutoCommit(false);

            PreparedStatement statement = connection.prepareStatement
                    ("DELETE FROM produktbatch WHERE brugerID = ?;");
            statement.setInt(1,id);
            statement.executeUpdate();

            connection.commit();
        }catch (SQLException e){
            connection.rollback();
            e.printStackTrace();
        }
        connection.close();

    }
}
