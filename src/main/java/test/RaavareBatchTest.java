package test;

import DAL.DAO.IDAO;
import DAL.DAO.RaavareBatchDAO;
import DAL.DTO.RaavareBatch;
import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

public class RaavareBatchTest {
    IDAO<RaavareBatch> raavareBatch = new RaavareBatchDAO();
    @Test
    public void raavareBatchTest() {
        RaavareBatch raavareBatch = new RaavareBatch();
    }
}
