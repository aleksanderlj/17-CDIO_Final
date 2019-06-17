package rest;

import DAL.DAO.IDAO;
import DAL.DAO.RaavareBatchDAO;
import DAL.DAO.RaavareDAO;
import DAL.DTO.Raavare;
import DAL.DTO.RaavareBatch;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.SQLException;

@Path("raavarebatch")
public class RaavarebatchREST {
    private IDAO<RaavareBatch> db = new RaavareBatchDAO();

    @POST
    @Path("create")
    @Consumes(MediaType.APPLICATION_JSON)
    public String createRaavare(RaavareBatch raavarebatch) throws SQLException, IDAO.DALException {
        String eString = "1";

        try {
            db.create(raavarebatch);
        } catch (Exception e){
            eString = "-1";
        }
        return eString;
    }

    @GET
    @Path("get/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public RaavareBatch getRaavare(@PathParam("id") String id) throws SQLException, IDAO.DALException {
        return db.get(Integer.parseInt(id));
    }

    @POST
    @Path("delete/{id}")
    public void deleteRaavare(@PathParam("id") String id) throws SQLException, IDAO.DALException {
        db.delete(Integer.parseInt(id));
    }

    @POST
    @Path("update")
    @Consumes(MediaType.APPLICATION_JSON)
    public void updateRaavare(RaavareBatch raavarebatch) throws SQLException, IDAO.DALException {
        db.update(raavarebatch);
    }

    @GET
    @Path("list")
    public RaavareBatch[] getRaavarelist() throws SQLException, IDAO.DALException {
        return db.getList();
    }

}
