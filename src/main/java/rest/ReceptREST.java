package rest;


import DAL.DAO.IDAO;
import DAL.DAO.ReceptDAO;
import DAL.DTO.Recept;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.SQLException;

@Path("recept")
public class ReceptREST {
    private IDAO<Recept> db = new ReceptDAO();

    @POST
    @Path("create")
    @Consumes(MediaType.APPLICATION_JSON)
    public String createProdukt(Recept recept) throws SQLException, IDAO.DALException {
        String eString = "1";

        try {
            db.create(recept);
        } catch (Exception e){
            eString = "-1";
        }
        return eString;
    }

    @GET
    @Path("get/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Recept getProdukt(@PathParam("id") String id) throws SQLException, IDAO.DALException {
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
    public void updateProdukt(Recept recept) throws SQLException, IDAO.DALException {
        db.update(recept);
    }

    @GET
    @Path("list")
    public Recept[] getProduktlist() throws SQLException, IDAO.DALException {
        return db.getList();
    }
}
