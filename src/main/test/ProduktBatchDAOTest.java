import DAL.DAO.IDAO;

import java.sql.SQLException;

import DAL.DAO.ProduktBatchDAO;
import DAL.DAO.UserDAO;
import DAL.DTO.ProduktBatch;
import DAL.DTO.User;
import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;



public class ProduktBatchDAOTest {

    private ProduktBatchDAO produktBatchDAO = new ProduktBatchDAO();
    private ProduktBatch produktBatch = new ProduktBatch();
    private ProduktBatch resivedProduktBatch = new ProduktBatch();

    @Test
    public void createTest()throws IDAO.DALException, SQLException{
        produktBatchDAO.delete(1234);
        produktBatchDAO.delete(1);

        produktBatch.setId(1);
        produktBatch.setReceptId(1);
        produktBatch.setBatchStatus(0);
        produktBatch.setOpstartDato("061199");
        produktBatch.setSlutDato("071199");
        produktBatchDAO.create(produktBatch);


        resivedProduktBatch = produktBatchDAO.get(1);
        assertEquals(produktBatch.getId(), resivedProduktBatch.getId());
        assertEquals(produktBatch.getReceptId(), resivedProduktBatch.getReceptId());
        assertEquals(produktBatch.getBatchStatus(), resivedProduktBatch.getBatchStatus());
        assertEquals(produktBatch.getOpstartDato(), resivedProduktBatch.getOpstartDato());
        assertEquals(produktBatch.getSlutDato(), resivedProduktBatch.getSlutDato());


        //produktBatch.setId(1234);
        //produktBatch.setReceptId(1);
        produktBatch.setBatchStatus(1);
        //produktBatch.setOpstartDato("111111");
        produktBatch.setSlutDato("123456");
        produktBatchDAO.update(produktBatch);

        resivedProduktBatch = produktBatchDAO.get(1);
        assertEquals(produktBatch.getId(), resivedProduktBatch.getId());
        assertEquals(produktBatch.getReceptId(), resivedProduktBatch.getReceptId());
        assertEquals(produktBatch.getBatchStatus(), resivedProduktBatch.getBatchStatus());
        assertEquals(produktBatch.getOpstartDato(), resivedProduktBatch.getOpstartDato());
        assertEquals(produktBatch.getSlutDato(), resivedProduktBatch.getSlutDato());





        produktBatch.setId(2);
        produktBatch.setReceptId(1);
        produktBatch.setBatchStatus(0);
        produktBatch.setOpstartDato("061199");
        produktBatch.setSlutDato("071199");
        produktBatchDAO.create(produktBatch);


        produktBatch.setId(3);
        produktBatch.setReceptId(1);
        produktBatch.setBatchStatus(0);
        produktBatch.setOpstartDato("061199");
        produktBatch.setSlutDato("071199");
        produktBatchDAO.create(produktBatch);


        ProduktBatch[] produktBatches = produktBatchDAO.getList();

        assertEquals(produktBatches[0].getId(), 1);
        assertEquals(produktBatches[1].getId(), 2);
        assertEquals(produktBatches[2].getId(), 3);

    }
}
