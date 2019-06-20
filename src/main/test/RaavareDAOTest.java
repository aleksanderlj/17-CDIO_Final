import java.sql.SQLException;

import DAL.DAO.IDAO;
import DAL.DAO.RaavareDAO;
import DAL.DTO.Raavare;
import org.junit.Test;
import static org.junit.Assert.assertEquals;

public class RaavareDAOTest {
    private RaavareDAO raavareDAO = new RaavareDAO();
    private Raavare raavare = new Raavare(-1, "Salt");
    private Raavare recievedRaavare = new Raavare();

    @Test
    public void createTest() throws SQLException, IDAO.DALException {
        // Sletter bruger -1, og opretter den igen.
        raavareDAO.delete(-1);
        raavareDAO.create(raavare);
        recievedRaavare = raavareDAO.get(-1);
        assertEquals(raavare.getId(), recievedRaavare.getId());
        assertEquals(raavare.getNavn(), recievedRaavare.getNavn());
        raavareDAO.delete(-1);
    }

    @Test
    public void updateTest() throws SQLException, IDAO.DALException {
        // Sletter, genopretter og opdatere brugeren, og sammenligner til sidst.
        raavareDAO.delete(-1);
        raavareDAO.create(raavare);
        raavare.setNavn("Vand");
        raavareDAO.update(raavare);
        recievedRaavare = raavareDAO.get(-1);
        assertEquals(raavare.getNavn(), recievedRaavare.getNavn());
        raavareDAO.delete(-1);
    }

    @Test
    public void getListTest() throws SQLException {
        // Henter listen og tester om vi har fået fat i de rigtige elementer.
        Raavare[] raavareArray = raavareDAO.getList();
        assertEquals(raavareArray[0].getNavn(), "Vand");
        assertEquals(raavareArray[1].getNavn(), "Salt");
    }
}
