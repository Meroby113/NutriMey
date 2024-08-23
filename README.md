
  <h1>Installation</h1>
  <p>To install Source Code to your Local Machine.</p>

  <h2>Prerequisites</h2>
  <ul>
      <li>Code Editor: Visual Studio Code</li>
      <li>Python: Version 3.12</li>
      <li>Postman</li>
      <li>SQLite Studio</li>
      <li>GitHub</li>
  </ul>

  <h2>Required Modules and Frameworks</h2>
  <ul>
      <li>Django</li>
      <li>Django Rest Framework</li>
      <li>Django CORS Headers</li>
  </ul>

  <h2>Setup Instructions</h2>
  <h3>1. Code Editor Setup:</h3>
  <ul>
      <li>Download the latest version of Visual Studio Code from <a href="https://code.visualstudio.com/download">https://code.visualstudio.com/download</a></li>
  </ul>

  <h3>2. Python Setup:</h3>
  <ul>
      <li>Download Python 3.12 from <a href="https://www.python.org/downloads/">https://www.python.org/downloads/</a>. Using the same version as the project will help avoid any compatibility issues.</li>
  </ul>

  <h3>3. Postman Setup:</h3>
  <ul>
      <li>Download Postman for testing REST APIs from <a href="https://www.postman.com/downloads/">https://www.postman.com/downloads/</a>. (This is not necessary if you do not want to test REST API)</li>
  </ul>

  <h3>4. SQLite Studio Setup:</h3>
  <ul>
      <li>Download SQLite Studio for managing the database from <a href="https://sqlitestudio.pl/">https://sqlitestudio.pl/</a>. (This is not necessary if you do not want to manage database)</li>
  </ul>

  <h3>5. GitHub Setup:</h3>
  <ul>
      <li>Download Git from <a href="https://git-scm.com/downloads">https://git-scm.com/downloads</a> to clone the project repository. (This is not necessary if you already have source code)</li>
  </ul>

  <h2>Installing Required Modules and Frameworks</h2>
  <p>Open your terminal and install the necessary modules:</p>
  <ul>
      <li>Install Django: <code>pip install django</code></li>
      <li>Install Django Rest Framework: <code>pip install djangorestframework</code></li>
      <li>Install Django CORS Headers: <code>pip install django-cors-headers</code></li>
  </ul>

  <h2>Cloning the Project Repository</h2>
  <p>You have two options to get the project files:</p>
  <h3>Option 1: Clone by using GitHub Command</h3>
  <ol>
      <li>Create a Directory:
          <ul>
              <li>Create a directory where you want to clone the project.</li>
          </ul>
      </li>
      <li>Navigate to the Directory:
          <ul>
              <li><code>cd &lt;your directory name&gt;</code></li>
          </ul>
      </li>
      <li>Clone the Project:
          <ul>
              <li><code>git clone https://github.com/Meroby113/NutriMey.git</code></li>
          </ul>
      </li>
  </ol>

  <h3>Option 2: Download Source Code</h3>
  <ul>
      <li>Download the source code directly to your machine from the repository.</li>
  </ul>

  <h2>Opening the Project</h2>
  <ol>
      <li>Open the Project in VS Code:
          <ul>
              <li>Open Visual Studio Code.</li>
              <li>Go to File > Open and select the directory where you cloned the project or downloaded the source code.</li>
          </ul>
      </li>
  </ol>

  <h2>Running the Project</h2>
  <ol>
      <li>Run the Project:
          <ul>
              <li>In your terminal, navigate to the project directory and run: <code>python manage.py runserver</code></li>
          </ul>
      </li>
      <li>View the Project:
          <ul>
              <li>Open your browser and go to <a href="http://127.0.0.1:8000/">http://127.0.0.1:8000/</a> to see the project running.</li>
          </ul>
      </li>
  </ol>

  <h2>Deployment</h2>
  <p>To deploy The Project on PythonAnywhere</p>

  <h3>Prerequisites</h3>
  <ul>
      <li>PythonAnywhere account:</li>
  </ul>

  <h3>Steps to Deploy</h3>
  <ol>
      <li>Log in to PythonAnywhere
          <ul>
              <li>Go to <a href="https://www.pythonanywhere.com/">https://www.pythonanywhere.com/</a> and log in to your account.</li>
          </ul>
      </li>
      <li>Create a New Web App
          <ul>
              <li>In the PythonAnywhere dashboard, go to the "Web" tab and click "Add a new web app".</li>
              <li>Choose "Manual configuration" and select "Python 3.12" as the Python version. If this version is not available, select the latest version.</li>
          </ul>
      </li>
     <img src="https://github.com/Meroby113/NutriMey/assets/91911696/d5f11274-6450-4d20-8abd-7e1cd68b187d">
      <li>Clone Your Repository on PythonAnywhere
          <ul>
              <li>Open a Bash console from the PythonAnywhere dashboard, then copy and paste this command to bash to clone project repository: <code>git clone https://github.com/Meroby113/NutriMey.git</code></li>
              <li>Navigate into your project directory: <code>cd NutriMey</code></li>
              <li>Create a virtual environment: <code>python3.12 -m venv myenv</code></li>
              <li>Activate the virtual environment: <code>source myenv/bin/activate</code></li>
              <li>Install the required modules: <code>pip install django djangorestframework django-cors-headers</code></li>
          </ul>
      </li>
      <li>Configure the WSGI File
          <ul>
              <li>Go to the "Web" tab in PythonAnywhere and find the WSGI configuration file link.</li>
              <li>Edit the WSGI file as follows:
                 <pre>
        Your WSGI file needs to look like this 
        Note: delete unnecessary codes.
                  </pre>
              </li>
          </ul>
         <img src="https://github.com/Meroby113/NutriMey/assets/91911696/786153d4-a5a3-44c2-8d1e-590fca46ed67">
      </li>
      <li>Configure Static Files in PythonAnywhere
          <ul>
              <li>In the "Static files" section of the Web tab, set up the URL and the path to project static files:</li>
              <li>URL: /static/</li>
              <li>Directory: /home/yourusername/NutriMey/static/</li>
          </ul>
      </li>
    <img src="https://github.com/Meroby113/NutriMey/assets/91911696/521027ab-1222-4f01-84a3-b7b70858e7b8">

   <p>Note: Change meroby113 with your username.</p>
    <li>Update the Allowed Hosts
        <ul>
            <li>You need to add Allowed_Hosts to your settings.py file so go to the "File" tab on PythonAnywhere and go to this path: home/Your username/NutriMey/nutriMey/settings.py and add:
                <pre>
  ALLOWED_HOSTS = ['yourusername.pythonanywhere.com']
                  </pre>
                  Then save the changes.
              </li>
          </ul>
      </li>
      <li>Run Database Migrations
          <ul>
              <li>Go to Bash console and run to get your sqlite3 database: <code>python manage.py migrate</code></li>
          </ul>
      </li>
      <li>Reload Your Web App
          <ul>
              <li>Go back to the "Web" tab on PythonAnywhere and click the "Reload" button for your web app.</li>
          </ul>
      </li>
      <li>Access Your Web App
          <ul>
              <li>Visit <a href="http://yourusername.pythonanywhere.com">http://yourusername.pythonanywhere.com</a> to see your deployed Django project.</li>
          </ul>
      </li>
  </ol>

  <p>Example Hosting: <a href="https://meroby113.pythonanywhere.com">https://meroby113.pythonanywhere.com</a></p>

  # Screenshots
  ![image](https://github.com/user-attachments/assets/26589e73-1b6e-47bb-86c2-1091961ce7d7)<br/>
  # Login
  ![image](https://github.com/user-attachments/assets/99f47b79-bbb5-4536-99e9-ae0ce141566c)<br/>
  # Register
  ![image](https://github.com/user-attachments/assets/ff6b83ce-958e-402c-ab7c-30dd72491f5b)<br/>
  # Main Page
  ![image](https://github.com/user-attachments/assets/cb3bcc89-cf7b-45c0-a577-8bfe13d9c6da)





