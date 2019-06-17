package rest;

import DAL.DAO.IKompDAO;
import DAL.DAO.ProduktBatchKompDAO;
import DAL.DTO.ProduktBatchKomp;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.SQLException;

@Path("produktbatch")
public class ProduktbatchKompREST {

    private IKompDAO<ProduktBatchKomp> db = new ProduktBatchKompDAO();

    @POST
    @Path("create")
    @Consumes(MediaType.APPLICATION_JSON)
    public void createProdukt(ProduktBatchKomp komp) throws SQLException, IKompDAO.DALException {
        db.create(komp);
    }

    /*
    @GET
    @Path("get/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public ProduktBatchKomp getProdukt(@PathParam("id") String id) throws SQLException, IKompDAO.DALException {
        return db.get(Integer.parseInt(id));
    }

    @POST
    @Path("delete/{id}")
    public void deleteProdukt(@PathParam("id") String id) throws SQLException, IKompDAO.DALException {
        db.delete(Integer.parseInt(id));
    }
    */

    @POST
    @Path("update")
    @Consumes(MediaType.APPLICATION_JSON)
    public void updateProdukt(ProduktBatchKomp produktbatch) throws SQLException, IKompDAO.DALException {
        db.update(produktbatch);
    }

    @GET
    @Path("list")
    public ProduktBatchKomp[] getProduktlist() throws SQLException, IKompDAO.DALException {
        return db.getList();
    }

    @GET
    @Path("list/{id}")
    public ProduktBatchKomp[] getProduktlist(@PathParam("id") String id) throws SQLException, IKompDAO.DALException {
        return db.getList(Integer.parseInt(id));
    }
}
