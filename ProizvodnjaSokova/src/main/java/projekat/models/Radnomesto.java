package projekat.models;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;


/**
 * The persistent class for the radnomesto database table.
 * 
 */
@Entity
@NamedQuery(name="Radnomesto.findAll", query="SELECT r FROM Radnomesto r")
public class Radnomesto implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="RADNOMESTO_RADNOMESTOID_GENERATOR", sequenceName="RADNO_MESTO_SEQ", allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="RADNOMESTO_RADNOMESTOID_GENERATOR")
	private Integer radnomestoid;

	private String nazivrm;

	//bi-directional many-to-one association to Radnik
	@JsonIgnore
	@OneToMany(mappedBy="radnomesto")
	private List<Radnik> radniks;

	public Radnomesto() {
	}

	public Integer getRadnomestoid() {
		return this.radnomestoid;
	}

	public void setRadnomestoid(Integer radnomestoid) {
		this.radnomestoid = radnomestoid;
	}

	public String getNazivrm() {
		return this.nazivrm;
	}

	public void setNazivrm(String nazivrm) {
		this.nazivrm = nazivrm;
	}

	public List<Radnik> getRadniks() {
		return this.radniks;
	}

	public void setRadniks(List<Radnik> radniks) {
		this.radniks = radniks;
	}

	public Radnik addRadnik(Radnik radnik) {
		getRadniks().add(radnik);
		radnik.setRadnomesto(this);

		return radnik;
	}

	public Radnik removeRadnik(Radnik radnik) {
		getRadniks().remove(radnik);
		radnik.setRadnomesto(null);

		return radnik;
	}

}