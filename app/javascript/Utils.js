/* Helper methods for creating an individual object */
// export function handleCreate(event) {
//   event.preventDefault();
//   let name = this.props.objectName
//     .substring(0, this.props.objectName.length - 1)
//     .toString();
//   const data = {};
//   data[name] = {};
//   var attribute = "";
//   for (attribute of this.props.attributes) {
//     data[name][attribute] = this.state[attribute]
//   }
//   this.props.run_ajax('/' + this.props.objectName + '.json', "POST", data);
//   this.handleClose();
// }

/* Helper methods for showing an individual selection */
export function handleInputChange(event) {
  this.setState({ [event.target.name]: event.target.value });
}



export function handleUpdate(event) {
  let name = this.props.objectName
    .substring(0, this.props.objectName.length - 1)
    .toString();
  event.preventDefault();
  const data = {};
  data[name] = {};
  var attribute = "";
  for (attribute of this.props.attributes) {
    data[name][attribute] = this.updateHelper(attribute);
  }
  this.props.run_ajax(
    "/" + this.props.objectName + "/".concat(this.props.selected.id, ".json"),
    "PATCH",
    data
  );
  this.handleClose();
}

export function updateHelper(name) {
  return this.state[name] === null
    ? this.props.selected[name]
    : this.state[name];
}

export function handleDelete(event) {
  event.preventDefault();
  let name = this.props.objectName
    .substring(0, this.props.objectName.length - 1)
    .toString();
  const data = {};
  data[name] = this.props.selected;
  this.props.run_ajax(
    "/" + this.props.objectName + "/".concat(this.props.selected.id, ".json"),
    "DELETE",
    data
  );
  this.handleClose();
}

/* Helper methods for showing an object tables */
export function run_ajax(
  link,
  method = "GET",
  data = {},
  callback = () => {
    this.getObjects();
  }
) {
  let options;
  if (method == "GET") {
    options = { method: method };
  } else {
    options = {
      method: method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    };
  }

  fetch(link, options)
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
    .then((result) => {
      callback(result);
    })
    .catch((error) => {
      if (error.statusText) {
        this.setState({ error: error });
      }
      callback(error);
    });
}

export function getObjects() {
  this.run_ajax("/" + this.state.objectName + ".json", "GET", {}, (res) => {
    this.setState({ objects: res });
  });
}

export function switchModal(name) {
  const modal = name;
  this.setState((prevState) => ({
    [modal]: !prevState[modal],
  }));
}

export function showSelected(id) {
  this.setState({
    selected: id,
  });
  this.switchModal("modal_show");
}

export function capitalize(string) {
  var newString = new String (string);
  return newString.charAt(0).toUpperCase() + newString.slice(1);
}

export function pluralize(string, suffix = 's') {
  var newString = Object.assign("", string);
  if (suffix == "ies") {
    newString = newString.slice(-1)
  }
  return newString + suffix
}

export function handleCreate(values) {
  let name = this.state.objectName;
  const data = {};
  data[name] = {};
  for (var attribute of this.state.attributes) {
    data[name][attribute] = values[attribute];
  }
  this.run_ajax("/" + this.state.plural + ".json", "POST", data);
  this.handleClose();
};

export function handleClose() {
  this.switchModal("modal_new");
};

