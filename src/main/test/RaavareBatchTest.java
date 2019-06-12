import DAL.DAO.IDAO;
import DAL.DAO.RaavareBatchDAO;
import DAL.DAO.RaavareDAO;
import DAL.DTO.Raavare;
import DAL.DTO.RaavareBatch;
import org.junit.Test;
import org.testng.annotations.ITestAnnotation;

import java.sql.SQLException;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

public class RaavareBatchTest {
    IDAO<RaavareBatch> raavareBatchDAO = new RaavareBatchDAO();
    IDAO<Raavare> raavareDAO = new RaavareDAO();
    @Test
    public void raavareBatchTest() throws SQLException, IDAO.DALException {
        //opretter råvarebatch
        RaavareBatch raavareBatch = new RaavareBatch(2,2,10.0,"Salt A/S");
        //indsætter råvarebatchet i databasen
        raavareBatchDAO.create(raavareBatch);
        RaavareBatch received = raavareBatchDAO.get(2);
        //Tester om dataen stemmer overens
        assertEquals(raavareBatch.getId(),received.getId());
        assertEquals(raavareBatch.getRaavareId(),received.getRaavareId());
        assertEquals(raavareBatch.getMaengde(),received.getMaengde(),1e-15);
        assertEquals(raavareBatch.getLeverandoer(),received.getLeverandoer());
        //Prøver at lave ændringer i råvarebatchet
        raavareBatch.setMaengde(20.0);
        raavareBatch.setLeverandoer("Salt ApS");
        raavareBatchDAO.update(raavareBatch);
        //Henter ned igen
        RaavareBatch received2 = raavareBatchDAO.get(2);
        assertEquals(received2.getId(),2);
        assertEquals(received2.getMaengde(),20.0,1e-15);
        assertEquals(received2.getLeverandoer(),"Salt ApS");
        //sletter oprettet data
        raavareBatchDAO.delete(2);
        //tester om det er blevet slettet
        RaavareBatch [] alleRaavareBatches = raavareBatchDAO.getList();
        for (RaavareBatch raavareBatch1 : alleRaavareBatches) {
            if ((raavareBatch.getId() == raavareBatch1.getId())) {
                fail();
            }
        }
    }
}
