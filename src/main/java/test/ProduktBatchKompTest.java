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
    public void produktBatchKompTest(){

    }
}
