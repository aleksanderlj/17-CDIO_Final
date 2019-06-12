import java.sql.SQLException;
import DAL.DAO.ProduktBatchDAO;
import DAL.DTO.ProduktBatch;
import org.junit.Test;
import static org.junit.Assert.assertEquals;

public class ProduktBatchDAOTest {
    private ProduktBatchDAO produktBatchDAO = new ProduktBatchDAO();
    private ProduktBatch produktBatch = new ProduktBatch
            (7545, 1, 0, "061199", "071199");
    private ProduktBatch receivedProduktBatch = new ProduktBatch();

    @Test
    public void createTest()throws SQLException {
        // Laver og henter objekter, og sammenligner med svaret fra databasen.
        produktBatchDAO.delete(7545);
        produktBatchDAO.create(produktBatch);
        receivedProduktBatch = produktBatchDAO.get(7545);
        assertEquals(produktBatch.getId(), receivedProduktBatch.getId());
        assertEquals(produktBatch.getReceptId(), receivedProduktBatch.getReceptId());
        assertEquals(produktBatch.getBatchStatus(), receivedProduktBatch.getBatchStatus());
        assertEquals(produktBatch.getOpstartDato(), receivedProduktBatch.getOpstartDato());
        assertEquals(produktBatch.getSlutDato(), receivedProduktBatch.getSlutDato());
        produktBatchDAO.delete(7545);
    }

    @Test
    public void updateTest() throws SQLException {
        // Updater i databasen, og sammenligner.
        produktBatchDAO.delete(7545);
        produktBatchDAO.create(produktBatch);
        produktBatch.setBatchStatus(1);
        produktBatch.setSlutDato("123456");
        produktBatchDAO.update(produktBatch);
        receivedProduktBatch = produktBatchDAO.get(7545);
        assertEquals(produktBatch.getId(), receivedProduktBatch.getId());
        assertEquals(produktBatch.getReceptId(), receivedProduktBatch.getReceptId());
        assertEquals(produktBatch.getBatchStatus(), receivedProduktBatch.getBatchStatus());
        assertEquals(produktBatch.getOpstartDato(), receivedProduktBatch.getOpstartDato());
        assertEquals(produktBatch.getSlutDato(), receivedProduktBatch.getSlutDato());
        produktBatchDAO.delete(7545);
    }

    @Test
    public void getListTest() throws SQLException {
        // Henter listen og tjekker id med de tre første elementer.
        ProduktBatch[] produktBatches = produktBatchDAO.getList();
        assertEquals(produktBatches[0].getId(), 1);
        assertEquals(produktBatches[1].getId(), 2);
        assertEquals(produktBatches[2].getId(), 3);

    }
}
