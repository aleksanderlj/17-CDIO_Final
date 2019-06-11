package test;

import DAL.DAO.IDAO;
import DAL.DAO.RaavareBatchDAO;
import DAL.DAO.RaavareDAO;
import DAL.DTO.Raavare;
import DAL.DTO.RaavareBatch;
import org.junit.Test;

import java.sql.SQLException;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

public class RaavareBatchTest {
    IDAO<RaavareBatch> raavareBatchDAO = new RaavareBatchDAO();
    IDAO<Raavare> raavareDAO = new RaavareDAO();
    @Test
    public void raavareBatchTest() throws SQLException, IDAO.DALException {
        //opretter raavare
        Raavare salt = new Raavare(2,"salt");
        raavareDAO.create(salt);
        //opretter råvarebatch
        RaavareBatch raavareBatch = new RaavareBatch(1,1,10.0,"Salt A/S");
        //indsætter råvarebatchet i databasen
        raavareBatchDAO.create(raavareBatch);
        RaavareBatch received = raavareBatchDAO.get(1);
        //Tester om dataen stemmer overens
        assertEquals(raavareBatch.getId(),received.getId());
        assertEquals(raavareBatch.getRaavareId(),received.getRaavareId());
        assertEquals(raavareBatch.getMaengde(),received.getMaengde(),1e-15);
        assertEquals(raavareBatch.getLeverandoer(),received.getLeverandoer());
        //Prøver at lave ændringer i opskriften
        raavareBatch.setRaavareId(2);
        raavareBatch.setMaengde(20.0);
        raavareBatch.setLeverandoer("Salt ApS");
        raavareBatchDAO.update(raavareBatch);
        //Henter ned igen
        RaavareBatch received2 = raavareBatchDAO.get(1);
        assertEquals(received2.getId(),1);
        assertEquals(received2.getRaavareId(),2);
        assertEquals(received2.getMaengde(),20.0,1e-15);
        assertEquals(received2.getLeverandoer(),"Salt ApS");
        //sletter oprettet data
        raavareBatchDAO.delete(1);
        raavareDAO.delete(1);
        //tester om det er blevet slettet
        RaavareBatch [] alleRaavareBatches = raavareBatchDAO.getList();
        for (RaavareBatch raavareBatch1 : alleRaavareBatches) {
            if ((raavareBatch.getId() == raavareBatch1.getId())) {
                fail();
            }
        }
        /*
        Raavare [] alleRaavarer = raavareDAO.getList();
        for (Raavare raavare : alleRaavarer) {
            if ((salt.getId() == raavare.getId())) {
                fail();
            }
        }
        */
    }
}
