import java.sql.SQLException;

import DAL.DAO.IDAO;
import DAL.DAO.RaavareDAO;
import DAL.DTO.Raavare;
import org.junit.Test;
import static org.junit.Assert.assertEquals;

public class RaavareDAOTest {
    private RaavareDAO raavareDAO = new RaavareDAO();
    private Raavare raavare = new Raavare(7545, "Salt");
    private Raavare recievedRaavare = new Raavare();

    @Test
    public void createTest() throws SQLException, IDAO.DALException {
        // Sletter bruger 7545, og opretter den igen.
        raavareDAO.delete(7545);
        raavareDAO.create(raavare);
        recievedRaavare = raavareDAO.get(7545);
        assertEquals(raavare.getId(), recievedRaavare.getId());
        assertEquals(raavare.getNavn(), recievedRaavare.getNavn());
        raavareDAO.delete(7545);
    }

    @Test
    public void updateTest() throws SQLException, IDAO.DALException {
        // Sletter, genopretter og opdatere brugeren, og sammenligner til sidst.
        raavareDAO.delete(7545);
        raavareDAO.create(raavare);
        raavare.setNavn("Vand");
        raavareDAO.update(raavare);
        recievedRaavare = raavareDAO.get(7545);
        assertEquals(raavare.getNavn(), recievedRaavare.getNavn());
        raavareDAO.delete(7545);
    }

    @Test
    public void getListTest() throws SQLException {
        // Henter listen og tester om vi har fået fat i de rigtige elementer.
        Raavare[] raavareArray = raavareDAO.getList();
        assertEquals("Zinc", raavareArray[0].getNavn());
        assertEquals("salt", raavareArray[1].getNavn());
    }
}
