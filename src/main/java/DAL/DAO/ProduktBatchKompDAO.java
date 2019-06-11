package DAL.DAO;

import DAL.ConnectionController;
import DAL.DTO.ProduktBatchKomp;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class ProduktBatchKompDAO implements IKompDAO<ProduktBatchKomp> {
    ConnectionController connectionController = new ConnectionController();

    @Override
    public int create(ProduktBatchKomp produktBatchKomp) throws SQLException {
        Connection connection = connectionController.createConnection();

        try{
            connection.setAutoCommit(false);

            PreparedStatement statement = connection.prepareStatement
                    ("INSERT INTO produktBatchKomp (produktBatchID, raavareBatchID, tara, netto, brugerID) VALUES (?,?,?,?,?);");
            statement.setInt(1, produktBatchKomp.getProduktBatchID());
            statement.setInt(2, produktBatchKomp.getRaavareBatchID());
            statement.setDouble(3, produktBatchKomp.getTara());
            statement.setDouble(4, produktBatchKomp.getNetto());
            statement.setInt(5, produktBatchKomp.getBrugerID());
            statement.executeUpdate();

            connection.commit();
        }catch (SQLException e){
            connection.rollback();
            e.printStackTrace();
        }
        connection.close();
        return 0;    }

    //todo
    @Override
    public ProduktBatchKomp get(int receptId, int raavareId) throws SQLException {
        return null;
    }

    //todo
    @Override
    public ProduktBatchKomp[] getList() {
        return null;
    }

    //todo
    @Override
    public ProduktBatchKomp[] getList(int id) {
        return null;
    }

    //todo
    @Override
    public void update(ProduktBatchKomp raavare){

    }

    //todo
    @Override
    public void delete(int id){

    }
}
