CREATE TABLE IF NOT EXISTS `USUARIO_ROLES` (
  `ID_ROL` INT NOT NULL AUTO_INCREMENT,
  `NOMBRE` VARCHAR(45) NULL,
  `ESTADO` TINYINT(1) NULL DEFAULT 1,
  PRIMARY KEY (`ID_ROL`),
  UNIQUE INDEX `ID_ROL_UNIQUE` (`ID_ROL` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`USUARIOS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `USUARIOS` (
  `ID_USUARIO` INT NOT NULL AUTO_INCREMENT,
  `RUT` INT NOT NULL,
  `DV` VARCHAR(1) NOT NULL,
  `NOMBRE` VARCHAR(45) NOT NULL,
  `AP_PATERNO` VARCHAR(45) NOT NULL,
  `AP_MATERNO` VARCHAR(45) NOT NULL,
  `ESTA_SUSCRITO` VARCHAR(1) NULL,
  `ESTADO` TINYINT NULL DEFAULT 1,
  `USUARIO_ROLES_ID_ROL` INT NOT NULL,
  PRIMARY KEY (`ID_USUARIO`),
  UNIQUE INDEX `ID_USUARIO_UNIQUE` (`ID_USUARIO` ASC),
  INDEX `fk_USUARIOS_USUARIO_ROLES_idx` (`USUARIO_ROLES_ID_ROL` ASC),
  CONSTRAINT `fk_USUARIOS_USUARIO_ROLES`
    FOREIGN KEY (`USUARIO_ROLES_ID_ROL`)
    REFERENCES `USUARIO_ROLES` (`ID_ROL`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`DONACIONES`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DONACIONES` (
  `ID_DONACION` INT NOT NULL AUTO_INCREMENT,
  `FECHA` DATE NULL,
  `MONTO` INT NULL,
  `ID_USUARIO` INT NULL,
  `ESTADO` TINYINT(1) NULL DEFAULT 1,
  `USUARIOS_ID_USUARIO` INT NOT NULL,
  PRIMARY KEY (`ID_DONACION`),
  UNIQUE INDEX `ID_DONACION_UNIQUE` (`ID_DONACION` ASC),
  INDEX `fk_DONACIONES_USUARIOS1_idx` (`USUARIOS_ID_USUARIO` ASC),
  CONSTRAINT `fk_DONACIONES_USUARIOS1`
    FOREIGN KEY (`USUARIOS_ID_USUARIO`)
    REFERENCES `USUARIOS` (`ID_USUARIO`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`VENTAS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `VENTAS` (
  `ID_VENTA` INT NOT NULL AUTO_INCREMENT,
  `FECHA` DATE NULL,
  `HORA` VARCHAR(45) NULL,
  `ESTADO` TINYINT(1) NULL DEFAULT 1,
  `USUARIOS_ID_USUARIO` INT NOT NULL,
  PRIMARY KEY (`ID_VENTA`),
  UNIQUE INDEX `ID_VENTA_UNIQUE` (`ID_VENTA` ASC) ,
  INDEX `fk_VENTAS_USUARIOS1_idx` (`USUARIOS_ID_USUARIO` ASC) ,
  CONSTRAINT `fk_VENTAS_USUARIOS1`
    FOREIGN KEY (`USUARIOS_ID_USUARIO`)
    REFERENCES `USUARIOS` (`ID_USUARIO`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`SEGUIMIENTOS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SEGUIMIENTOS` (
  `ID_SEGUIMIENTO` INT NOT NULL AUTO_INCREMENT,
  `NOMBRE` VARCHAR(45) NOT NULL,
  `ESTADO` TINYINT(1) NULL DEFAULT 1,
  PRIMARY KEY (`ID_SEGUIMIENTO`),
  UNIQUE INDEX `ID_SEGUIMIENTO_UNIQUE` (`ID_SEGUIMIENTO` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`DESPACHOS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DESPACHOS` (
  `ID_DESPACHO` INT NOT NULL AUTO_INCREMENT,
  `FECHA_DESPACHO` DATE NULL,
  `FECHA_ENTREGA` DATE NULL,
  `ESTADO` TINYINT(1) NULL DEFAULT 1,
  `SEGUIMIENTOS_ID_SEGUIMIENTO` INT NOT NULL,
  `VENTAS_ID_VENTA` INT NOT NULL,
  PRIMARY KEY (`ID_DESPACHO`),
  UNIQUE INDEX `ID_DESPACHO_UNIQUE` (`ID_DESPACHO` ASC) ,
  INDEX `fk_DESPACHOS_SEGUIMIENTOS1_idx` (`SEGUIMIENTOS_ID_SEGUIMIENTO` ASC) ,
  INDEX `fk_DESPACHOS_VENTAS1_idx` (`VENTAS_ID_VENTA` ASC) ,
  CONSTRAINT `fk_DESPACHOS_SEGUIMIENTOS1`
    FOREIGN KEY (`SEGUIMIENTOS_ID_SEGUIMIENTO`)
    REFERENCES `SEGUIMIENTOS` (`ID_SEGUIMIENTO`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_DESPACHOS_VENTAS1`
    FOREIGN KEY (`VENTAS_ID_VENTA`)
    REFERENCES `VENTAS` (`ID_VENTA`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`PROMOCIONES`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PROMOCIONES` (
  `ID_PROMOCIONES` INT NOT NULL AUTO_INCREMENT,
  `NOMBRE` VARCHAR(45) NOT NULL,
  `ESTADO` TINYINT(1) NULL DEFAULT 1,
  PRIMARY KEY (`ID_PROMOCIONES`),
  UNIQUE INDEX `ID_PROMOCIONES_UNIQUE` (`ID_PROMOCIONES` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ESPECIES`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ESPECIES` (
  `ID_ESPECIES` INT NOT NULL AUTO_INCREMENT,
  `NOMBRE` VARCHAR(45) NOT NULL,
  `ESTADO` TINYINT(1) NULL DEFAULT 1,
  PRIMARY KEY (`ID_ESPECIES`),
  UNIQUE INDEX `idESPECIES_UNIQUE` (`ID_ESPECIES` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`PRODUCTOS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PRODUCTOS` (
  `ID_PRODUCTOS` INT NOT NULL AUTO_INCREMENT,
  `NOMBRE` VARCHAR(45) NOT NULL,
  `VALOR` INT NULL,
  `STOCK` INT NULL,
  `IMAGEN` VARCHAR(205) NULL,
  `ESTADO` TINYINT(1) NULL DEFAULT 1,
  `PROMOCIONES_ID_PROMOCIONES` INT NOT NULL,
  `ESPECIES_ID_ESPECIES` INT NOT NULL,
  PRIMARY KEY (`ID_PRODUCTOS`),
  UNIQUE INDEX `ID_PRODUCTOS_UNIQUE` (`ID_PRODUCTOS` ASC),
  INDEX `fk_PRODUCTOS_PROMOCIONES1_idx` (`PROMOCIONES_ID_PROMOCIONES` ASC),
  INDEX `fk_PRODUCTOS_ESPECIES1_idx` (`ESPECIES_ID_ESPECIES` ASC),
  CONSTRAINT `fk_PRODUCTOS_PROMOCIONES1`
    FOREIGN KEY (`PROMOCIONES_ID_PROMOCIONES`)
    REFERENCES `PROMOCIONES` (`ID_PROMOCIONES`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PRODUCTOS_ESPECIES1`
    FOREIGN KEY (`ESPECIES_ID_ESPECIES`)
    REFERENCES `ESPECIES` (`ID_ESPECIES`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`PRODUCTOSVENTAS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PRODUCTOSVENTAS` (
  `ID_PRODUCTOSVENTAS` INT NOT NULL AUTO_INCREMENT,
  `VALOR_TOTALVENTA` INT NULL,
  `ESTADO` TINYINT(1) NULL DEFAULT 1,
  `PRODUCTOS_ID_PRODUCTOS` INT NOT NULL,
  `VENTAS_ID_VENTA` INT NOT NULL,
  PRIMARY KEY (`ID_PRODUCTOSVENTAS`),
  UNIQUE INDEX `ID_PRODUCTOSVENTAS_UNIQUE` (`ID_PRODUCTOSVENTAS` ASC),
  INDEX `fk_PRODUCTOSVENTAS_PRODUCTOS1_idx` (`PRODUCTOS_ID_PRODUCTOS` ASC),
  INDEX `fk_PRODUCTOSVENTAS_VENTAS1_idx` (`VENTAS_ID_VENTA` ASC),
  CONSTRAINT `fk_PRODUCTOSVENTAS_PRODUCTOS1`
    FOREIGN KEY (`PRODUCTOS_ID_PRODUCTOS`)
    REFERENCES `PRODUCTOS` (`ID_PRODUCTOS`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PRODUCTOSVENTAS_VENTAS1`
    FOREIGN KEY (`VENTAS_ID_VENTA`)
    REFERENCES `VENTAS` (`ID_VENTA`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
