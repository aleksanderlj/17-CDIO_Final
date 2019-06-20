package rest;

import DAL.DAO.DAOController;
import DAL.DAO.IDAO;
import DAL.DAO.RaavareDAO;
import DAL.DAO.UserDAO;
import DAL.DTO.Raavare;
import DAL.DTO.RaavareBatch;
import DAL.DTO.User;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.SQLException;

@Path("raavare")
public class RaavareREST {
    private IDAO<Raavare> db = DAOController.getRaavareDAO();

    //private IDAO<Raavare> db = new RaavareDAO();

    @POST
    @Path("create")
    @Consumes(MediaType.APPLICATION_JSON)
    public String createRaavare(Raavare raavare) throws SQLException, IDAO.DALException {
        String eString = "1";

        try {
            db.create(raavare);
        } catch (Exception e){
            eString = "-1";
        }
        return eString;
    }

    @GET
    @Path("get/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Raavare getRaavare(@PathParam("id") String id) throws SQLException, IDAO.DALException {
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
    public void updateRaavare(Raavare raavare) throws SQLException, IDAO.DALException {
        db.update(raavare);
    }

    @GET
    @Path("list")
    public Raavare[] getRaavarelist() throws SQLException, IDAO.DALException {
        return db.getList();
    }
}
