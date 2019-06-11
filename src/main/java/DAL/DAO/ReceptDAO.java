package DAL.DAO;

import DAL.ConnectionController;
import DAL.DTO.Recept;
import DAL.DTO.ReceptKomp;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ReceptDAO implements IDAO<Recept> {

    private ConnectionController connectionController = new ConnectionController();

    @Override
    public int create(Recept recept) throws DALException, SQLException {
        Connection connection = connectionController.createConnection();

        try{
            connection.setAutoCommit(false);

            PreparedStatement statement = connection.prepareStatement
                    ("INSERT INTO recept (receptID, receptNavn) VALUES (?,?);");
            statement.setInt(1, recept.getId());
            statement.setString(2, recept.getNavn());
            statement.executeUpdate();

            statement = connection.prepareStatement
                    ("INSERT INTO receptKomp (receptID, raavareID, nonNetto, tolerance) VALUES (?,?,?,?)");
            for(int i = 0 ; i < recept.getIndholdsListe().length ; i++){
                statement.setInt(1, recept.getId());
                statement.setInt(2, recept.getIndholdsListe()[i].getRaavareId());
                statement.setDouble(3, recept.getIndholdsListe()[i].getNonNetto());
                statement.setDouble(4, recept.getIndholdsListe()[i].getTolerance());
                statement.executeUpdate();
            }

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
        List<ReceptKomp> indholdsListe = new ArrayList<>();

        try{
            connection.setAutoCommit(false);

            PreparedStatement statement = connection.prepareStatement
                    ("SELECT * FROM recept WHERE receptID = ?;");
            statement.setInt(1, id);
            ResultSet resultSet = statement.executeQuery();
            if (resultSet.next()){
                recept.setNavn(resultSet.getString(2));
            }

            statement = connection.prepareStatement
                    ("SELECT * FROM receptKomp WHERE receptID = ?");
            resultSet = statement.executeQuery();
            while (resultSet.next()){
                indholdsListe.add(new ReceptKomp());
                indholdsListe.get(indholdsListe.size()-1).setRaavareId(resultSet.getInt(2));
                indholdsListe.get(indholdsListe.size()-1).setNonNetto(resultSet.getDouble(3));
                indholdsListe.get(indholdsListe.size()-1).setTolerance(resultSet.getDouble(4));
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
            statement.setString(1, recept.getNavn());
            statement.setInt(2,recept.getId());
            statement.executeUpdate();

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
