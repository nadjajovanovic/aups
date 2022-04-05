package projekat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import projekat.models.Mesto;

public interface MestoRepository extends JpaRepository<Mesto, Integer>{

}
