FROM althack/ros2:humble-dev

# Install additional ament linters: https://index.ros.org/r/ament_lint/github-ament-ament_lint/
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y --no-install-recommends \
  ros-humble-ament-mypy \
  && rm -rf /var/lib/apt/lists/*
ENV DEBIAN_FRONTEND=
