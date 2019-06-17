package rest;

import DAL.DAO.IDAO;
import DAL.DAO.ProduktBatchDAO;
import DAL.DTO.ProduktBatch;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.SQLException;

@Path("produktbatch")
public class ProduktbatchREST {

    private IDAO<ProduktBatch> db = new ProduktBatchDAO();

    @POST
    @Path("create")
    @Consumes(MediaType.APPLICATION_JSON)
    public int createProdukt(ProduktBatch produktbatch) throws SQLException, IDAO.DALException {
        int id;

        try {
            id = db.create(produktbatch);
        } catch (Exception e){
            id = -1;
        }
        return id;
    }

    @GET
    @Path("get/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public ProduktBatch getProdukt(@PathParam("id") String id) throws SQLException, IDAO.DALException {
        return db.get(Integer.parseInt(id));
    }

    @POST
    @Path("delete/{id}")
    public void deleteProdukt(@PathParam("id") String id) throws SQLException, IDAO.DALException {
        db.delete(Integer.parseInt(id));
    }

    @POST
    @Path("update")
    @Consumes(MediaType.APPLICATION_JSON)
    public void updateProdukt(ProduktBatch produktbatch) throws SQLException, IDAO.DALException {
        db.update(produktbatch);
    }

    @GET
    @Path("list")
    public ProduktBatch[] getProduktlist() throws SQLException, IDAO.DALException {
        return db.getList();
    }
}
