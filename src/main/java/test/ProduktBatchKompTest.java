package test;

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
        ProduktBatchKomp produktBatchKomp = new ProduktBatchKomp(1,1,1,800.0,80.0);
        produktBatchKompDAO.create(produktBatchKomp);
        ProduktBatchKomp received = produktBatchKompDAO.get(1,1);
        //Tester om dataen stemmer overens
        assertEquals(produktBatchKomp.getProduktBatchID(),received.getProduktBatchID());
        assertEquals(produktBatchKomp.getRaavareBatchID(),received.getRaavareBatchID());
        assertEquals(produktBatchKomp.getBrugerID(),received.getBrugerID());
        assertEquals(produktBatchKomp.getTara(),received.getTara(),1e-15);
        assertEquals(produktBatchKomp.getNetto(),received.getNetto(),1e-15);
    }
}
