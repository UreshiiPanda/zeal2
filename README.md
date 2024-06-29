# Zeal Deployment Task

#### A challenge to incorporate 5 separated services into 1 functional deployment in 5 days

#### Tech Stack:  Angular, Tailwind, Node, Docker, Kubernetes, GCP

<br><br>


<a name="readme-top"></a>


<!-- Deploy Task Gif -->
![deploy_task](https://github.com/UreshiiPanda/zeal2/assets/39992411/67574d87-01b8-4447-9029-5ac9246dab3f)



<!-- ABOUT THE PROJECT -->
## About The Project
This app was built as part of a software internship for the purposes of practicing constructing demos and
presenting them to clients. While my teammates were building the Angular frontend, I was tasked with a challenge to 
connect 5 separated services (from 3 separated repos) into a clean, automated deployment within 5 days. This task was mostly achieved through
a GCP automated build which included Dockerizing each service, orchestrating them via GCP's kubernetes service (GKE), and
also via re-routing each app via GKE's ingress networking. The backend Node service, along with the TiDB database were also
ready to be integrated into the build. A GIF has been included to illustrate the overall transition which occurred.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- How To Run -->
## How to Run:
<br>

0. While this app was hosted on GCP, it has been taken down to conserve GCP resources for other projects. Note that this
   project has all of the pieces in place to be automated via GCP's Cloud Build service as long as the appropriate GCP
   APIs are enabled, and the appropriate environment variables are loaded into GCP in order to accommodate any DB that
   devs wish to use.

1. Clone all project files into a root working directory.
    ```sh
        git clone https://github.com/UreshiiPanda/zeal2.git
    ```
2. Setup your gcloud cli tool and your GCP environment to run this cloudbuild.yaml file and combined_k8s.yaml file

3. Run the automated build via the gcloud cli tool (from the root directory) or the GCP console:
    ```sh
        gcloud builds submit --config=cloudbuild.yaml .
    ```

