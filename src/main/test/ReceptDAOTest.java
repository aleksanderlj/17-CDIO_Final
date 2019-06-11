import java.sql.SQLException;

import DAL.DAO.IDAO;
import DAL.DAO.ReceptDAO;
import DAL.DTO.Recept;
import org.junit.Test;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

public class ReceptDAOTest {
    private ReceptDAO receptDAO = new ReceptDAO();
    private Recept recept = new Recept();
    private Recept recivedRecept = new Recept();

    @Test
    public void receptTest() throws SQLException, IDAO.DALException {
        // Tester create i recept dao
        receptDAO.delete(7545);
        recept.setId(7545);
        recept.setNavn("Penicillin");
        receptDAO.create(recept);
        recivedRecept = receptDAO.get(7545);
        assertEquals(recept.getId(), recivedRecept.getId());
        assertEquals(recept.getNavn(), recivedRecept.getNavn());


        receptDAO.delete(7545);
    }
}
