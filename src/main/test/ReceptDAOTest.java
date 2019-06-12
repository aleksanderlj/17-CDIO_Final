import java.sql.SQLException;

import DAL.DAO.IDAO;
import DAL.DAO.ReceptDAO;
import DAL.DTO.Recept;
import DAL.DTO.ReceptKomp;
import org.junit.Test;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

public class ReceptDAOTest {
    private ReceptDAO receptDAO = new ReceptDAO();
    ReceptKomp[] receptKompArray = new ReceptKomp[0];
    private Recept recept = new Recept(7545, "Penicillin", receptKompArray);
    private Recept recivedRecept = new Recept();

    @Test
    public void createTest() throws SQLException, IDAO.DALException {
        receptDAO.delete(7545);
        receptDAO.create(recept);
        recivedRecept = receptDAO.get(7545);
        assertEquals(recept.getId(), recivedRecept.getId());
        assertEquals(recept.getNavn(), recivedRecept.getNavn());
        receptDAO.delete(7545);
    }

    @Test
    public void updateTest() throws SQLException, IDAO.DALException {
        receptDAO.delete(7545);
        receptDAO.create(recept);
        recept.setNavn("Antibiotika");
        receptDAO.update(recept);
        assertEquals(recept.getNavn(), receptDAO.get(7545).getNavn());
        receptDAO.delete(7545);
    }

    @Test
    public void getListTest(){

    }
}
