import DAL.DAO.*;
import DAL.DTO.ProduktBatchKomp;
import DAL.DTO.Raavare;
import DAL.DTO.RaavareBatch;
import org.junit.Test;

import java.sql.SQLException;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

public class ProduktBatchKompTest {
    IKompDAO<ProduktBatchKomp> produktBatchKompDAO = new ProduktBatchKompDAO();
    @Test
    public void produktBatchKompTest() throws SQLException, IKompDAO.DALException {
        ProduktBatchKomp produktBatchKomp = new ProduktBatchKomp(1,1,800.0,80.0, 1);
        produktBatchKompDAO.create(produktBatchKomp);
        ProduktBatchKomp received = produktBatchKompDAO.get(1,1);
        //Tester om dataen stemmer overens
        assertEquals(produktBatchKomp.getProduktBatchID(),received.getProduktBatchID());
        assertEquals(produktBatchKomp.getRaavareBatchID(),received.getRaavareBatchID());
        assertEquals(produktBatchKomp.getBrugerID(),received.getBrugerID());
        assertEquals(produktBatchKomp.getTara(),received.getTara(),1e-15);
        assertEquals(produktBatchKomp.getNetto(),received.getNetto(),1e-15);
        //prøver at lave ændringer i produktbatchet
        produktBatchKomp.setTara(20.0);
        produktBatchKomp.setNetto(2.0);
        produktBatchKompDAO.update(produktBatchKomp);
        //Henter ned igen
        ProduktBatchKomp received2 = produktBatchKompDAO.get(1,1);
        assertEquals(received2.getTara(),20.0,1e-15);
        assertEquals(received2.getNetto(),2.0,1e-15);
        //sletter oprettet data
        produktBatchKompDAO.delete(1,1);
        //tester om det er blevet slettet
        ProduktBatchKomp [] alleProduktKomp = produktBatchKompDAO.getList();
        for (ProduktBatchKomp produktBatchKomp1 : alleProduktKomp) {
            if ((produktBatchKomp.getProduktBatchID() == produktBatchKomp1.getProduktBatchID()||produktBatchKomp.getRaavareBatchID() == produktBatchKomp1.getRaavareBatchID())) {
                fail();
            }
        }
    }
}
