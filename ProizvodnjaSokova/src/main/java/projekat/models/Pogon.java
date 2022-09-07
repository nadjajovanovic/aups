package projekat.models;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;


/**
 * The persistent class for the pogon database table.
 * 
 */
@Entity
@NamedQuery(name="Pogon.findAll", query="SELECT p FROM Pogon p")
public class Pogon implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="POGON_POGONID_GENERATOR", sequenceName="POGON_SEQ", allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="POGON_POGONID_GENERATOR")
	private Integer pogonid;

	private String oznakap;

	public Pogon() {
	}

	public Integer getPogonid() {
		return this.pogonid;
	}

	public void setPogonid(Integer pogonid) {
		this.pogonid = pogonid;
	}

	public String getOznakap() {
		return this.oznakap;
	}

	public void setOznakap(String oznakap) {
		this.oznakap = oznakap;
	}

}