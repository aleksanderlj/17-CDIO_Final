package DAL.DAO.ArrayDAO;

import DAL.DAO.IDAO;
import DAL.DTO.Recept;
import DAL.DTO.ReceptKomp;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ReceptDAO_Array implements IDAO<Recept> {

    List<Recept> receptList = new ArrayList<>();

    public ReceptDAO_Array(){
        receptList.add(new Recept(1, "Saltvand", new ReceptKomp[]{
                new ReceptKomp(1, 1, 5),
                new ReceptKomp(2, 0.359, 5)
                }));
        receptList.add(new Recept(2, "Saltet Honning", new ReceptKomp[]{
                new ReceptKomp(2, 2, 5),
                new ReceptKomp(3, 0.5, 10)
        }));
        receptList.add(new Recept(3, "Saltet Honningvand", new ReceptKomp[]{
                new ReceptKomp(1, 1, 10),
                new ReceptKomp(2, 0.2, 5),
                new ReceptKomp(3, 0.45, 5)
        }));
    }

    @Override
    public int create(Recept recept) throws IDAO.DALException, SQLException {
        boolean taken = false;

        for(int n=0 ; n<receptList.size() ; n++){
            if (receptList.get(n).getId() == recept.getId()){
                taken = true;
            }
        }

        if (!taken){
            receptList.add(recept);
        }else {
            throw new IDAO.DALException("Error");
        }
        return 0;
    }

    @Override
    public Recept get(int id) throws IDAO.DALException, SQLException {
        Recept recept = null;
        for(int n=0 ; n<receptList.size() ; n++){
            if (receptList.get(n).getId() == id){
                recept = receptList.get(n);
            }
        }
        return recept;
    }

    @Override
    public Recept[] getList() throws IDAO.DALException, SQLException {
        return receptList.toArray(new Recept[receptList.size()]);
    }

    @Override
    public void update(Recept recept) throws IDAO.DALException, SQLException {
        for (int n=0 ; n<receptList.size() ; n++){
            if (receptList.get(n).getId() == recept.getId()){
                receptList.set(n, recept);
            }
        }
    }

    @Override
    public void delete(int id) throws IDAO.DALException, SQLException {
        for (int n=0 ; n<receptList.size() ; n++){
            if (receptList.get(n).getId() == id){
                receptList.remove(n);
                n--;
            }
        }
    }
}
