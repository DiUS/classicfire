class canvasHelper {
  constructor(_canvas, guessCallback) {
    this._canvas = _canvas;
    this.guessCallback = guessCallback;
    this.context = this._canvas.getContext("2d");

    this._canvas.setAttribute("width", this._canvas.clientWidth);
    this._canvas.setAttribute("height", this._canvas.clientHeight);
    this._canvas.addEventListener("mousedown", this.handleMouseDown.bind(this));
    this._canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));
    this._canvas.addEventListener("mouseup", this.handleMouseUp.bind(this));
    this._canvas.addEventListener(
      "pointerdown",
      this.handleMouseDown.bind(this)
    );
    this._canvas.addEventListener(
      "pointermove",
      this.handleMouseMove.bind(this)
    );
    this._canvas.addEventListener("pointerup", this.handleMouseUp.bind(this));
    this._canvas.addEventListener(
      "touchstart",
      this.handleTouchDown.bind(this)
    );
    this._canvas.addEventListener("touchmove", this.handleTouchMove.bind(this));
    this._canvas.addEventListener("touchend", this.handleTouchEnd.bind(this));

    this.lastCoords = null;

    this.xCoords = [];
    this.yCoords = [];
    this.times = [];
    this.isTimerOn = false;
    this.lastTimeStamp = 0;
    this.lastCheckTimeStamp = 0;
  }

  handleTouchDown(e) {
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousedown", {
      clientX: touch.clientX,
      clientY: touch.clientY,
      timeStamp: touch.timeStamp
    });
    this._canvas.dispatchEvent(mouseEvent);
    e.preventDefault();
  }

  handleTouchMove(e) {
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY,
      timeStamp: touch.timeStamp
    });
    this._canvas.dispatchEvent(mouseEvent);
    e.preventDefault();
  }

  handleTouchEnd(e) {
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mouseup", {
      clientX: touch.clientX,
      clientY: touch.clientY,
      timeStamp: touch.timeStamp
    });
    this._canvas.dispatchEvent(mouseEvent);
    e.preventDefault();
  }

  handleMouseDown(e) {
    this.isDrawing = true;

    var coords = this.getMousePos(e);
    this.lastCoords = coords;
  }

  handleMouseMove(e) {
    if (this.isDrawing) {
      var coords = this.getMousePos(e);
      this.context.beginPath();
      this.context.lineWidth = 10;
      this.context.lineCap = "round";

      this.context.moveTo(this.lastCoords.x, this.lastCoords.y);
      this.context.lineTo(coords.x, coords.y);
      this.context.stroke();

      this.lastCoords = coords;
      this.xCoords.push(coords.x);
      this.yCoords.push(coords.y);
      this.times.push(this.getTime(e));

      if (this.lastTimeStamp - this.lastCheckTimeStamp > 1000) {
        this.checkTheSketch();
        this.lastCheckTimeStamp = this.lastTimeStamp;
      }
    }
  }

  handleMouseUp() {
    this.lastCoords = null;
    this.isDrawing = false;
  }

  getMousePos(e) {
    var rect = this._canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  resetCanvas() {
    this.context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    this.xCoords = [];
    this.yCoords = [];
    this.times = [];
    this.isTimerOn = false;
    this.lastTimeStamp = null;
    this.guessCallback([]);
  }

  getTime(e) {
    var time;
    if (!this.isTimerOn) {
      this.isTimerOn = true;
      time = 0;
    } else {
      var timeDelta = e.timeStamp - this.lastTimeStamp;
      time = this.times[this.times.length - 1] + timeDelta;
    }

    this.lastTimeStamp = e.timeStamp;
    return time;
  }

  checkTheSketch() {
    const url =
      "https://inputtools.google.com/request?ime=handwriting&app=quickdraw&dbg=1&cs=1&oe=UTF-8";

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Accept", "*/*");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = () => {
      if (xhr.status === 200) {
        this.formatAndSendData(xhr.responseText);
      } else {
        console.log("Request failed.  Returned status of " + xhr.status);
      }
    };

    const data = {
      input_type: 0,
      requests: [
        {
          language: "quickdraw",
          writing_guide: {
            width: this._canvas.width,
            height: this._canvas.height
          },
          ink: [[this.xCoords, this.yCoords, this.times]]
        }
      ]
    };

    const request_data = JSON.stringify(data);
    xhr.send(request_data);
  }

  formatAndSendData(res) {
    const result = JSON.parse(res);
    const matches = result[1][0][1];

    const keywords = matches.map(m => ({ keyword: m }));
    this.guessCallback(keywords);
  }
}

export default canvasHelper;
