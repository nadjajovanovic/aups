package projekat.models;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;


/**
 * The persistent class for the mesto database table.
 * 
 */
@Entity
@NamedQuery(name="Mesto.findAll", query="SELECT m FROM Mesto m")
public class Mesto implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="MESTO_MESTOID_GENERATOR", sequenceName="MESTO_SEQ", allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="MESTO_MESTOID_GENERATOR")
	private Integer mestoid;

	private String nazivm;

	private String postanskibroj;

	public Mesto() {
	}

	public Integer getMestoid() {
		return this.mestoid;
	}

	public void setMestoid(Integer mestoid) {
		this.mestoid = mestoid;
	}

	public String getNazivm() {
		return this.nazivm;
	}

	public void setNazivm(String nazivm) {
		this.nazivm = nazivm;
	}

	public String getPostanskibroj() {
		return this.postanskibroj;
	}

	public void setPostanskibroj(String postanskibroj) {
		this.postanskibroj = postanskibroj;
	}

}